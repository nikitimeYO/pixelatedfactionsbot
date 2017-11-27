const NUM_FIELDS = 6;
address = null;
port = null;
online = null;
version = null;
motd = null;
current_players = null;
max_players = null;

module.exports ={
    init: function(address, port, callback){
        this.address = address;
        this.port = port;

        const net = require('net');
        const client = net.connect(port, address, () =>{
            var buff = new Buffer([ 0xFE, 0x01 ]);
            client.write(buff);
        });
        client.setTimeout(5000);

        client.on('data', (data) =>{
            if(data != null && data != ''){
                var server_info = data.toString().split("\x00\x00\x00");
                if(server_info != null && server_info.length >= NUM_FIELDS){
                    this.online = true;
                this.version = server_info[2].replace(/\u0000/g,'');
                this.motd = server_info[3].replace(/\u0000/g,'');
                this.current_players = server_info[4].replace(/\u0000/g,'');
                this.max_players = server_info[5].replace(/\u0000/g,'');
            }else{
                this.online = false;
            }
        }
        callback();
        client.end();
        });

        client.on('timeout', () =>{
            callback();
            client.end();
            process.exit();
        });

        client.on('end', () =>{});

        client.on('error', (err) =>{
            callback();
        });
    }
};