## Mail.cf configuration

For the scheduler to work correctly and send out email reports, the mail.cf file needs to be configured.

This file can be found under 'Administration/File System/File Server Root/Etc/Mail' in the Report Server Admin.

'''
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
   <smtp>
      <host>mail.akvo.org</host>
      <port>465</port>
      <username>SMTPEMAILADDRESSg@akvo.org</username>
      <password>CORRECT_PASSWORD</password>
      <ssl>true</ssl>
      <tls>
         <enable>false</enable>
         <require>false</require>
      </tls>
   </smtp>
   <mail>
      <sender>noreply@akvo.org</sender>
      <encryptionPolicy>allow_mixed</encryptionPolicy>
   </mail>
</configuration>
'''
