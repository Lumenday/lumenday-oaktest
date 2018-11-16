FROM oaklabs/oak:4.3.4

WORKDIR /app
COPY . /app
COPY asound.conf /etc/asound.conf

RUN apt-get update -yq && apt-get install -y --no-install-recommends \
    alsa-tools \
    alsa-utils \
    pulseaudio

RUN npm i --engine-strict=true --progress=false --loglevel="error" \
    && npm cache clean --force

CMD ["/app"]

ENV NODE_ENV=production \
    REMOTE_URL=http://0.0.0.0:9151/ \
    PLATFORM_HOST=localhost:443

EXPOSE 9999
