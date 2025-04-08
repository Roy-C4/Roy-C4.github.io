import chromadb
from chromadb.utils import embedding_functions

# Connect to your ChromaDB database
chroma_client = chromadb.PersistentClient(path="./chroma_cv_db")

# Load the collection
collection = chroma_client.get_or_create_collection(
    name="cv_embeddings",
    embedding_function=embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name='all-MiniLM-L6-v2'
    )
)

# Query to check stored embeddings/documents
stored_docs = collection.get()

# Display stored document IDs and content
print("Total embeddings stored:", len(stored_docs['ids']))

for doc_id, doc in zip(stored_docs['ids'], stored_docs['documents']):
    print(f"ID: {doc_id}\nContent: {doc}\n{'-'*50}")
