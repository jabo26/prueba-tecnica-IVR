/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.konecta.nomina.modelo;

import java.time.LocalDate;

/**
 *
 * @author Vanessa
 */
public class FechaNomina {
    private LocalDate fechaEntrada;
    private LocalDate fechaPago;
    private boolean esDiaHabil;  
    
    public FechaNomina(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
        this.esDiaHabil = true;
    }
}
