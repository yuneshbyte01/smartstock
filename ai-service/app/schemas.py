from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class ProductData(BaseModel):
    product_id: str
    historical_dates: List[date]
    stock_levels: List[int]
    sales_history: List[int]

    class Config:
        schema_extra = {
            "example": {
                "product_id": "123e4567-e89b-12d3-a456-426614174000",
                "historical_dates": ["2025-09-01", "2025-09-02", "2025-09-03"],
                "stock_levels": [100, 90, 80],
                "sales_history": [10, 5, 8]
            }
        }


class ForecastResult(BaseModel):
    product_id: str
    forecast_date: date
    expected_demand: int = Field(ge=0)
    recommended_stock: int = Field(ge=0)

    class Config:
        schema_extra = {
            "example": {
                "product_id": "123e4567-e89b-12d3-a456-426614174000",
                "forecast_date": "2025-09-30",
                "expected_demand": 50,
                "recommended_stock": 70
            }
        }
