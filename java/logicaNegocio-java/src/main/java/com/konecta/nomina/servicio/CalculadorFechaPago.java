/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.konecta.nomina.servicio;

import com.konecta.nomina.modelo.FechaNomina;
import java.time.DayOfWeek;
import java.time.LocalDate;
import org.springframework.stereotype.Service;

/**
 *
 * @author Vanessa
 */
@Service
public class CalculadorFechaPago {

    private final ServicioFestivos servicioFestivos;

    public CalculadorFechaPago(ServicioFestivos servicioFestivos) {
        this.servicioFestivos = servicioFestivos;
    }

    public boolean esDiaHabil(LocalDate fecha) {
        // Se valida si es fin de semana
        if (fecha.getDayOfWeek() == DayOfWeek.SATURDAY
                || fecha.getDayOfWeek() == DayOfWeek.SUNDAY) {
            return false;
        }

        // Verifica si es festivo
        return !servicioFestivos.esFestivo(fecha);
    }

    public LocalDate obtenerProximaFechaPago(LocalDate fechaEntrada) {
        // Calculando la próxima fecha de pago (15 o 30/31)
        LocalDate fechaObjetivo;

        if (fechaEntrada.getDayOfMonth() <= 15) {
            fechaObjetivo = fechaEntrada.withDayOfMonth(15);
        } else {
            fechaObjetivo = fechaEntrada.withDayOfMonth(fechaEntrada.lengthOfMonth());
        }

        // Si la fecha objetivo ya paso se moueve al siguiente 
        if (fechaObjetivo.isBefore(fechaEntrada)) {
            if (fechaEntrada.getDayOfMonth() <= 15) {
                fechaObjetivo = fechaEntrada.withDayOfMonth(fechaEntrada.lengthOfMonth());
            } else {
                fechaObjetivo = fechaEntrada.plusMonths(1).withDayOfMonth(15);
            }
        }

        // Si no es día hábil, hacer un retro hasta encontrar uno
        while (!esDiaHabil(fechaObjetivo) || 
           (fechaObjetivo.getDayOfMonth() == 15 && !esDiaHabil(fechaObjetivo.plusDays(1)))) {
        fechaObjetivo = fechaObjetivo.minusDays(1);
    }
    
    return fechaObjetivo;
    }

//     public FechaNomina calcularFechaPago(LocalDate fechaEntrada) {
//        FechaNomina fechaNomina = new FechaNomina(fechaEntrada);
//        fechaNomina.setFechaPago(obtenerProximaFechaPago(fechaEntrada));
//        fechaNomina.setEsDiaHabil(esDiaHabil(fechaNomina.getFechaPago()));
//        return fechaNomina;
//    }
}
