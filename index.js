import puppeteer from "puppeteer"; // importamos la libreria de puppeteer

async function openWebPage(){ // declaramos una funcion asincrona 

    const browser = await puppeteer.launch({ // declaramos el launcher o configuracion de puppeteer

        headless: false, 
        slowMode: 200, // para cada paso se va demorar 200
    });
    const page = await browser.newPage(''); // se declara que va abrir una nueva pagina del navegador
    
    await page.goto('https://accounts.spotify.com/es/login?continue=https%3A%2F%2Fopen.spotify.com%2Fintl-es'); // declaramos la ruta a la cual va ingresar
    await page.type('#login-username',''); // buscamos el id del input del username, posteriormente proporcionamos el username
    await page.type('#login-password','');// buscamos el id del input del password, posteriormente proporcionamos el password
    await page.click('#login-button');// por ultimo click al boton de iniciar sesion
    await page.waitForNavigation({ waitUntil: 'networkidle2' });// como estamos cambiando de pagina esperamos que se termine de cargar toda la pagina tras el login
    await page.waitForSelector('div[role="presentation"][style*="transform: translateY(0px)"]'); // por seguridad esperamos a que ese node con esas caracteriusticas este bien formado

    const itemCount = await page.evaluate(() => { 
        const divElement = document.querySelector('div[role="presentation"][style*="transform: translateY(0px)"]');// seleccionamos nodo padre que posee todas las playlist

        if (divElement) {//preguntamos si encontro el nodo con las caracteristicas puestas
            return divElement.querySelectorAll('li').length; //una vez encontrado el nodo padre buscamos todos los nodos de tipo li contenidos en su padre
          }
          return 0; // Retorna 0 si no encontro el nodo
    });
    console.log(`Tienes ${itemCount} Playlist.`); // imprimimos en consola la cantidad de nodos hijos que tenia dicho contenedor
}

openWebPage();
