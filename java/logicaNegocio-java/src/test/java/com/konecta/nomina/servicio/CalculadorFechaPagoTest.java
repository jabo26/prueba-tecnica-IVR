/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.konecta.nomina.servicio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.test.context.TestPropertySource;

/**
 *
 * @author Vanessa
 */
@SpringBootTest
@TestPropertySource(properties = {
    "logging.level.root=INFO",
    "logging.level.com.konecta=DEBUG"
})
public class CalculadorFechaPagoTest {

    @Autowired
    private CalculadorFechaPago calculadorFechaPago;

    @Test
    void deberiaCalcularFechaPrimerQuincena() {
        // Caso del 2024-02-05 -> 2024-02-15
        LocalDate fechaEntrada = LocalDate.of(2024, 2, 5);
        LocalDate fechaEsperada = LocalDate.of(2024, 2, 15);
        LocalDate fechaCalculada = calculadorFechaPago.obtenerProximaFechaPago(fechaEntrada);
        assertEquals(fechaEsperada, fechaCalculada);
    }

    @Test
    void deberiaAjustarPorSemanaSanta() {
        // Caso del: 2024-03-30 -> 2024-03-27
        LocalDate fechaEntrada = LocalDate.of(2024, 3, 30);
        LocalDate fechaEsperada = LocalDate.of(2024, 3, 27);
        LocalDate fechaCalculada = calculadorFechaPago.obtenerProximaFechaPago(fechaEntrada);
        assertEquals(fechaEsperada, fechaCalculada);
    }

    @Test
    void deberiaAjustarPorFinDeSemana() {
        // Caso del: 2024-06-30 -> 2024-06-28
        LocalDate fechaEntrada = LocalDate.of(2024, 6, 30);
        LocalDate fechaEsperada = LocalDate.of(2024, 6, 28);
        LocalDate fechaCalculada = calculadorFechaPago.obtenerProximaFechaPago(fechaEntrada);
        assertEquals(fechaEsperada, fechaCalculada);
    }

    @Test
    void deberiaMantenerseSiEsDiaHabil() {
        // Caso del: 2024-07-15 -> 2024-07-15
        LocalDate fechaEntrada = LocalDate.of(2024, 7, 15);
        LocalDate fechaEsperada = LocalDate.of(2024, 7, 15);
        LocalDate fechaCalculada = calculadorFechaPago.obtenerProximaFechaPago(fechaEntrada);
        assertEquals(fechaEsperada, fechaCalculada);
    } 

    @Test
    void deberiaManejarCambioDeAnio() {
        // Caso en el borde: cambio de año
        LocalDate fechaEntrada = LocalDate.of(2024, 12, 20);
        LocalDate fechaEsperada = LocalDate.of(2024, 12, 31);
        LocalDate fechaCalculada = calculadorFechaPago.obtenerProximaFechaPago(fechaEntrada);
        assertEquals(fechaEsperada, fechaCalculada);
    }

    @Test
    void deberiaValidarDiasHabiles() {
        // Pruebas del método esDiaHabil
        assertTrue(calculadorFechaPago.esDiaHabil(LocalDate.of(2024, 2, 15)),
                "2024-02-15 debe ser día hábil");

        assertFalse(calculadorFechaPago.esDiaHabil(LocalDate.of(2024, 3, 28)),
                "2024-03-28 no debe ser hábil por ser Jueves Santo");

        assertFalse(calculadorFechaPago.esDiaHabil(LocalDate.of(2024, 6, 29)),
                "2024-06-29 no debe ser hábil por ser sábado");
    }
}
