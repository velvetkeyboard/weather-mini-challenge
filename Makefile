domain=challenge
compose=docker-compose -p $(domain)
backend_container_name=api
frontend_container_name=webapp


start:
	$(compose) start

stop:
	$(compose) stop

restart: stop start

spinup:
	$(compose) up -d --build

spindown:
	-$(compose) down

respin: spindown spinup backend_migrate backend_restore_sample

backend_logs:
	docker logs -f $(domain)_$(backend_container_name)_1

frontend_logs:
	docker logs -f $(domain)_$(frontend_container_name)_1

backend_shell:
	docker exec -ti $(domain)_$(backend_container_name)_1 sh

frontend_shell:
	docker exec -ti $(domain)_$(frontend_container_name)_1 sh

backend_migrate:
	docker exec -ti $(domain)_$(backend_container_name)_1 sh -c \
		"python manage.py migrate"

backend_restore_sample:
	docker exec -ti $(domain)_$(backend_container_name)_1 sh -c \
		"python manage.py loaddata sample_database.json"

backend_test:
	docker exec -ti $(domain)_$(backend_container_name)_1 sh -c \
		"python manage.py test -v3"