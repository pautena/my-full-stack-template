import uuid

from pydantic import BaseModel, Field

from app.items.models import ItemBase


class ItemSchema(BaseModel):
    id: uuid.UUID
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    owner_id: uuid.UUID


class ItemsSchema(BaseModel):
    data: list[ItemSchema]
    count: int


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore
