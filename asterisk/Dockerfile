FROM debian:12
ARG ASTERISK_VERSION=18.26.2
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential libxml2-dev libncurses5-dev libssl-dev wget git subversion uuid-dev libjansson-dev libedit-dev libsqlite3-dev pkg-config curl ca-certificates sox
WORKDIR /usr/src
RUN git clone -b ${ASTERISK_VERSION} --depth 1 https://gerrit.asterisk.org/asterisk asterisk-src || true
WORKDIR /usr/src/asterisk-src
RUN contrib/scripts/get_mp3_source.sh || true
RUN ./configure --with-jansson-bundled && make -j$(nproc) && make install && make samples && make config
# Create run user
RUN useradd -m -d /var/lib/asterisk -r -s /sbin/nologin asterisk || true
RUN mkdir -p /var/spool/asterisk/monitor /var/www/html/monitor /etc/asterisk
RUN chown -R asterisk:asterisk /var/spool/asterisk /var/www/html/monitor /etc/asterisk
EXPOSE 5060/udp 5060/tcp 10000-20000/udp
CMD ["/usr/sbin/supervisord","-n"]
