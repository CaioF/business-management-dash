.PHONY: build up front

build:
	docker compose up -d --build

up:
	docker compose up -d

front: up
	docker compose exec front sh