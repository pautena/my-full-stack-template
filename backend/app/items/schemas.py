import uuid
from collections.abc import Iterable

from sqlmodel import Field, SQLModel

from app.items.models import ItemBase


class ItemSchema(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class ItemsSchema(SQLModel):
    data: Iterable[ItemSchema]
    count: int


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore
