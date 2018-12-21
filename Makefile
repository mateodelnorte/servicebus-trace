DEBUG=servicebus:trace*
REDIS_HOST=localhost
REDIS_PORT=6379

docker-test:
	rm -f .queues
	docker-compose up -d rabbitmq redis
	sleep 15
	make test

test:
	$(MAKE) DEBUG= test-debug

test-debug:
	DEBUG=$(DEBUG) \
	REDIS_HOST=$(REDIS_HOST) \
	REDIS_PORT=$(REDIS_PORT) \
	./node_modules/.bin/mocha -R spec --recursive --exit

.PHONY: test test-debug