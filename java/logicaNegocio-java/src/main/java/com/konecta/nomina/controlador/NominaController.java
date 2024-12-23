/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.konecta.nomina.controlador;

/**
 *
 * @author Vanessa
 */
import com.konecta.nomina.servicio.CalculadorFechaPago;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/nomina")
public class NominaController {
    private final CalculadorFechaPago calculadorFechaPago;

    public NominaController(CalculadorFechaPago calculadorFechaPago) {
        this.calculadorFechaPago = calculadorFechaPago;
    }

    @GetMapping("/fecha-pago")
    public ResponseEntity<?> calcularFechaPago(@RequestParam String fecha) {
        try {
            LocalDate fechaEntrada = LocalDate.parse(fecha);
            LocalDate fechaPago = calculadorFechaPago.obtenerProximaFechaPago(fechaEntrada);
            return ResponseEntity.ok(fechaPago);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de fecha inválido. Use yyyy-MM-dd");
        }
    }
}
