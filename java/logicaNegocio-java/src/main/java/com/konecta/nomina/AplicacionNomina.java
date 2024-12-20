/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.konecta.nomina;

import com.konecta.nomina.servicio.CalculadorFechaPago;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

/**
 *
 * @author Vanessa
 */
public class AplicacionNomina implements CommandLineRunner {
    private final CalculadorFechaPago calculadorFechaPago;
    private final DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public AplicacionNomina(CalculadorFechaPago calculadorFechaPago) {
        this.calculadorFechaPago = calculadorFechaPago;
    }

    public static void main(String[] args) {
        SpringApplication.run(AplicacionNomina.class, args);
    }
    
    @Override
    public void run(String... args) {
        // Ejemplos de prueba
        LocalDate[] fechasPrueba = {
            LocalDate.of(2024, 2, 5),
            LocalDate.of(2024, 3, 30),
            LocalDate.of(2024, 6, 30),
            LocalDate.of(2024, 7, 15)
        };

        System.out.println("Calculando fechas de pago de nómina...\n");
        
        for (LocalDate fecha : fechasPrueba) {
            LocalDate fechaPago = calculadorFechaPago.obtenerProximaFechaPago(fecha);
            System.out.printf("Fecha ingresada: %s, Próxima fecha de pago: %s%n", 
                            fecha.format(formatoFecha), 
                            fechaPago.format(formatoFecha));
        }
    }
}
