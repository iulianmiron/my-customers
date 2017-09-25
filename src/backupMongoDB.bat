@echo off
REM Create a file name for the database output which contains the date and time. Replace any characters which might cause an issue.
set backupLocation=C:\MongoBackups\
set filename=database %date% %time%
set filename=%filename:/=-%
set filename=%filename: =__%
set filename=%filename:.=_%
set filename=%filename::=-%
REM Export the database
echo Running backup "%backupLocation%%filename%"
mongodump --out %backupLocation%%filename%
REM ZIP the backup directory
echo Running backup "%backupLocation%%filename%"
"c:\Program Files\7-Zip\7z.exe" a -tzip "%backupLocation%%filename%.zip" "%backupLocation%%filename%"
REM Delete the backup directory (leave the ZIP file). The /q tag makes sure we don't get prompted for questions 
echo Deleting original backup directory "%filename%"
rmdir "%backupLocation%%filename%" /s /q
REM Delete files older than 7 days
forfiles -p "C:\MongoBackups" -s -m *. -d 7 -c "cmd /c del @path"
echo BACKUP COMPLETE