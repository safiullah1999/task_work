import ipcalc
import  ipaddress

for x in ipcalc.Network('172.16.42.0/30'):
    print(str(x))

subnet = ipcalc.Network('172.16.42.0/30')    
print("subnet mask:",subnet.netmask())
print("network:",subnet.network())

# print('192.168.42.23' in Network('192.168.42.0/24'))

ipi = ipaddress.ip_interface('172.16.42.0/30')
print("Address", ipi.ip)
print("Mask", ipi.netmask)
print("Cidr", str(ipi.network).split('/')[1])
print("Network", str(ipi.network).split('/')[0])
print("Broadcast", ipi.network.broadcast_address)
# print("Broadcast", ipi.network.host_address)