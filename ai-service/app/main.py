# app/main.py

from fastapi import FastAPI
from app.schemas import ProductData, ForecastResult
from datetime import date

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AI service running"}

@app.post("/forecast", response_model=ForecastResult)
def forecast(product: ProductData):
    # Fake AI logic (to be replaced)
    last_stock = product.stock_levels[-1]
    avg_sales = sum(product.sales_history) // len(product.sales_history)

    return ForecastResult(
        product_id=product.product_id,
        forecast_date=date.today(),
        expected_demand=avg_sales,
        recommended_stock=max(last_stock - avg_sales, 0) + 20
    )
