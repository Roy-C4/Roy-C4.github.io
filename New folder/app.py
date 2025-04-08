from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from chromadb.utils import embedding_functions
from sentence_transformers import SentenceTransformer
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

app = FastAPI()

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

chroma_client = chromadb.PersistentClient(path="./cv_embeddings")
collection = chroma_client.get_collection(
    name="cv_embeddings",
    embedding_function=embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name='all-MiniLM-L6-v2'
    )
)

model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map='auto',
    torch_dtype=torch.float32  # CPU mode for free tier
)

llm_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    do_sample=True,
    temperature=0.3,
    max_new_tokens=200
)

class Query(BaseModel):
    query: str

@app.post("/chat")
async def chat_with_cv(query: Query):
    query_embedding = embedding_model.encode(query.query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    relevant_docs = "\n".join(results['documents'][0])

    prompt = f"""
    Use the following CV information to answer the user's question:

    {relevant_docs}

    Question: {query.query}

    Answer:
    """

    generated = llm_pipeline(prompt)[0]['generated_text']
    answer = generated.split("Answer:")[-1].strip()

    return {"answer": answer}
