var net = require('net')

var chatServer = net.createServer()
	clientList = []

chatServer.on('connection', function(client)
{
	client.name = client.remoteAddress + ":" + client.remotePort

	client.write('Bienvenido al chat '+client.name+'\n');

	clientList.push(client)

	client.on('data', function(data)
	{
		broadcasteo(data,client)
	})
})

function broadcasteo(message, client)
{
	for (var i =0; i<clientList.length; i+=1) 
	{
		if (client !== clientList[i]) 
		{
			clientList[i].write(client.name + " dice: " + message)
		}
		
	}
}

chatServer.listen(9000)