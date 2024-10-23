.PHONY: build up stop restart front back db hurl reset-db hurl-tests tests

build:
	docker compose up -d --build

up:
	docker compose up -d

stop:
	docker compose stop

restart: stop up

front: up
	docker compose exec front sh

back: up
	docker compose exec back sh

db: up
	docker compose exec db psql -U business

hurl: up
	docker compose exec hurl sh

reset-db: up
	docker compose exec db psql -U business -a -f /dashboard-scripts/drop_tables.sql
	docker compose exec db psql -U business -a -f /dashboard-scripts/create_db.sql
	docker compose exec db psql -U business -a -f /dashboard-scripts/seed.sql

hurl-tests: up
	docker compose exec db psql -U business -a -f /dashboard-scripts/reset_contacts.sql
	docker compose exec hurl ./hurl-tests.sh

tests: up
	docker compose exec back npm run testing