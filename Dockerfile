# FROM ระบุว่าเราจะใช้ image ของตัวไหน 
FROM node:10
RUN mkdir /usr/src/app 

#WORKDIR สำหรับจัดเก็บ source code 
WORKDIR /usr/src/app

#COPY สำหรับเพิ่มไฟล์ใน directory ให้ docker
COPY package*.json ./ 
 
RUN npm install
COPY . .

# EXPOSE บอก container ว่าใช้ port ไหน 
EXPOSE 3000

#CMD ระบุคำสั่งที่จะ run ภายใน container
CMD ["npm", "start"] 
