USE theme_db;

INSERT INTO theme_db.Usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('jenn@gmail.com','jennifer','lichtensztejn','123456','usuario','image 5.png');
INSERT INTO theme_db.Usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('rriggs5@csmonitor.com','Letícia','Amores','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','admin','image 8.png');
INSERT INTO theme_db.Usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('aschankelborg7@sciencedaily.com','Maria-Fernanda','Cabello','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','superadmin','image 10.png');


INSERT INTO theme_db.Categorias(nombre,imagen)
VALUES
('PANTALONES','pantalones.jpg'),
('REMERAS','Mockup_Camiseta_Doblada_mockupgratis.com.jpg'),
('ABRIGOS','Mockup_Hoodie_Sudadera_mockupgratis.com.jpg'),
('COMPLEMENTOS','Mockup_Bolsa_Tela_Chica_mockupgratis.com.jpg'),
('GIFT CARD','Tarjeta_Presentacion_mockupgratis.com.jpg');


INSERT INTO theme_db.Productos(nombre,descripcion,id_categoria,precio,talleXS,talleS,talleM,talleL,talleXL,talleXXL,talleUnico)
VALUES('jeans','pantalon largo negro',1,400,3,4,5,6,7,3,5);


INSERT INTO theme_db.Tickets(fecha,usuario_id)VALUES('2023-08-02',1);
INSERT INTO theme_db.Productos_tickets(id_producto,precioFechaCompra,id_ticket,cantidad)VALUES(2,'2023-08-02',2,1);
