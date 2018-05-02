from ftplib import FTP
import os
import getpass


ROOT_DIR = os.path.dirname(os.getcwd())
print (ROOT_DIR)

ROOT_DIR = os.path.join(ROOT_DIR, 'dist', 'test')

ftp = FTP("net4.cyberdev.fr")
username = raw_input('user name : ')

print(username)
password = getpass.getpass()
print(password)

ftp.login(user=username, passwd=password)
# ftp.login(user="pi", passwd='gui2one')

ftp.cwd("/httpdocs/test")


print(ftp.pwd())
files = ftp.nlst()

def grab_file(file_name, local_path):
    index = -1
    try :
        index = files.index(file_name)
        print("got file : ", f_name)
        print("local_path : ", local_path)

        local_file = open( os.path.join(local_path, file_name), 'wb')
        ftp.retrbinary('RETR '+file_name, local_file.write)
        # ftp.quit()
        
    except(ValueError):
        print("no file with this name")

    

print (ROOT_DIR)
for f_name in files:
    print (f_name)
    # grab_file(f_name, os.path.join(ROOT_DIR,"assets","data"))

# print (files)
ftp.quit()
ftp.close()