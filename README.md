#  Return Fraud Detection System 

## Project Structure

```
Return-Fraud-Detection/
├── data/                       # CSV datasets (train & test)
├── preprocessing/              # Feature engineering, encoding, ratios
├── graph/                     # Graph construction, Node2Vec embedding
├── model/                     # XGBoost training and evaluation
├── similarity/                # FAISS indexing and scoring
├── dashboard/                 # Streamlit UI app
├── llm_assistant/             # LLM-based risk explanation (Ollama)
├── trust_score.py             # Hybrid scoring layer
└── main_app.py                # Streamlit app entry point
```

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Return-Fraud-Detection
```

### Step 2: Install Dependencies

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install required packages:

```bash
pip install -r requirements.txt
```

### Step 3: Prepare the Data

Ensure the following files exist in the `data/` folder:

* `return_fraud_train_india.csv`
* `return_fraud_unseen_india.csv`

---

## Running the System Locally

### Step 1: Generate Graph Embeddings

```bash
python graph/generate_embeddings.py
```

### Step 2: Train Model

```bash
python model/train_xgboost.py
```

### Step 3: Compute Graph Similarities

```bash
python similarity/faiss_similarity.py
```

### Step 4: Generate Hybrid Trust Scores

```bash
python trust_score.py
```

### Step 5: Launch Streamlit Dashboard

```bash
streamlit run main_app.py
```

---

## Enable LLM-Based Risk Explanations

Install Ollama: [https://ollama.com/](https://ollama.com/)

Start an Ollama model:

```bash
ollama run mistral  # or phi3, llama2
```

Configure Streamlit app to use `llm_assistant/generate_explanation.py`

---

## Deployed App

[🔗 View Streamlit App](https://returnfraud.streamlit.app)

Explore fraud scores, inspect users, visualize fraud rings, and test LLM explanations.

---

## Features

* Behavioral + location-based feature engineering
* Graph embeddings using Node2Vec
* XGBoost-based fraud classifier
* FAISS-based similarity scoring
* Hybrid scoring engine (60% model + 40% graph)
* Trust tiering: Highly Trusted, Trusted, Watchlist, High Risk, Banned
* Fraud ring detection
* LLM-powered reasoning for explainable fraud
* Interactive dashboard via Streamlit

---

## Usage Flow

1. Upload data → Preprocessing
2. Graph embedding → Similarity scoring
3. Train model → Score generation
4. Dashboard display → LLM optional
