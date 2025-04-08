import fitz  # PyMuPDF
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.utils import embedding_functions

# Initialize the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Path to your CV PDF
cv_pdf_path = 'D:/roy/work/Saumya_Roy_CV.pdf'

# Extract text from the PDF
def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    for page in document:
        text += page.get_text()
    return text

cv_text = extract_text_from_pdf(cv_pdf_path)

# Split text into paragraphs or sections for better retrieval accuracy
paragraphs = [para.strip() for para in cv_text.split('\n') if para.strip()]

# Generate embeddings
embeddings = model.encode(paragraphs, convert_to_numpy=True)

# Store embeddings in ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_cv_db")

collection = chroma_client.get_or_create_collection(
    name="cv_embeddings",
    embedding_function=embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name='all-MiniLM-L6-v2'
    )
)

# Store paragraphs and embeddings
collection.add(
    documents=paragraphs,
    ids=[f'para_{i}' for i in range(len(paragraphs))]
)

print(f"{len(paragraphs)} embeddings generated and stored successfully.")
