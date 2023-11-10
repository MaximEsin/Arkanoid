# Резюме по выполненной работе (main)

Код написан достатончо хорошо: все переменные названы и названия функций
написаны со смыслом. Код разделен на функции, каждая из которых выполняет
свою задачу. Все функции имеют комментарии, которые описывают, что они делают.
Но весь код расположен в одном файле, что является не лучшим решением и будет
мешать при дальнейшем наращивании функционала. И в данной реализации имеется
сильная связанность логики игры и ее интрефейса, что так же будет усложнять
понимаение кода при расширении его функциональности. Так же было бы хорошо
использовать сборщик (например Vitejs), а так же использовать для рахработки
язык программирования TypeScript, который позволяет избежать многих ошибок
при разработке. А так же использовать библиотеку PixiJS, которая предоставляет
удобное API для работы с WebGL и Canvas и позволяет ускорить процесс разработки.

Исходя из всего что написано выше предлагаю перейти к следующему этапу
разработки и реалиовать ту же самую игру на PixiJS и TypeScript. И реализовать
ее придерживаясь принципов SOLID (<https://ru.wikipedia.org/wiki/SOLID_(программирование)>)
и использую ООП (<https://ru.wikipedia.org/wiki/Объектно-ориентированное_программирование>).
Так же предлагаю разделить
код на модули и все модули разместить в структуре проекта, при это структура
проекта должна быть такой чтобы мы легко могли понять где у нас находится
функционал отвечающий за отрисовку, а где за логику игры. Плюс так же хорошо
будет отделить логику от интерфейса игры и реализовать взаимодействие мкжду
этими частями черз отдельный слой. Так же предлагаю использовать сборщик Vitejs,
который позволит нам использовать TypeScript.

Реалиовать игру на PixiJS и TypeScript нужно в отдельной ветке, а потом
сравнить два варианта и выбрать лучший.
