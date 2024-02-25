// obtener la referencia al valor de calcular, sería el botón
const btn_calcular = document.getElementById('calcular');

// obtener id del mensaje de error
const mensaje_error = document.getElementById('error');
const resultado_uno = document.getElementById('resultado1');
const resultado_dos = document.getElementById('resultado2');
let hidratacion_basal, mantenimiento, medio_mantenimiento;


// agregar un evento al boton
btn_calcular.addEventListener('click', (event) => {
    event.preventDefault(); // Detener la propagación del evento click

    // obtener el valor de peso del input
    const peso = parseInt(document.getElementById('peso').value); // si no se le pone el parse float, toma como string, tambien se puede usar valueAsNumber en ese caso evitaría el uso del parseInt
    
    // si peso es nulo o es igual o menor a cero se muestra el error
    if (isNaN(peso) || peso <= 0) {
        // cambiar el display del mensaje a block para mostrarlo
        mensaje_error.style.display = 'block';
        resultado_uno.style.display = 'none';
        resultado_dos.style.display = 'none';// Cambia a 'block' para mostrar

    } else {
        mensaje_error.style.display = 'none';
        if (peso <= 30 ) {
            hidratacion_basal = hollyDaySegar(peso);
            mantenimiento = hidratacion_basal / 24;
            mantenimiento = mantenimiento.toFixed(2);  // numeros despues del punto
            medio_mantenimiento = mantenimiento * 1.5;
            medio_mantenimiento = medio_mantenimiento.toFixed(2);  // numeros despues del punto
            // mostrar resultado donde corresponde
            document.getElementById('mantenimiento').textContent = `${mantenimiento} cc/h`;
            document.getElementById('medioMantenimiento').textContent = `m+m/2 : ${medio_mantenimiento} cc/h`;
            resultado_uno.style.display = 'block';
            resultado_dos.style.display = 'none';

        } else {
            let r1500 = superficieCorporal(peso) * 1500;
            r1500 = r1500.toFixed();// numeros despues del punto
            mantenimiento = r1500 / 24;
            mantenimiento = mantenimiento.toFixed(2);  // numeros despues del punto
            document.getElementById('sc_1500').textContent = `SC * 1500: ${r1500}cc(${mantenimiento}cc/h)`;
            
            let r2000 = superficieCorporal(peso) * 2000;
            r2000 = r2000.toFixed();// numeros despues del punto
            mantenimiento = r2000 / 24;
            mantenimiento = mantenimiento.toFixed(2);  // numeros despues del punto
            
            
            document.getElementById('sc_2000').textContent = `SC * 2000: ${r2000}cc(${mantenimiento}cc/h)`;
            resultado_dos.style.display = 'block';
            resultado_uno.style.display = 'none';
        }
    }
});

// Funcion peso < 30 
function hollyDaySegar(peso) {
    // peso es menor o igual a 10
    if (peso <= 10) {
      return peso * 100;
    }
    // peso mayor a 10 y peso menor o igual a 20
    else if (peso > 10 && peso <= 20) {
        // primero se obtiene la hidratacion de los 10 kilos por eso
        // se hace 10 * 100, luego se le suma el resultado del peso - 10 kilos, que serian los de la franja anterior y este resultado se le multiplica * 50
        return 10 * 100 + (peso-10) * 50;
    }
    else if( peso > 20 ){
        return 10 * 100 + 10 * 50 + (peso - 20) * 20;
    }
}

function superficieCorporal(peso) {
    return ((peso * 4) + 7) / (peso + 90);
}
