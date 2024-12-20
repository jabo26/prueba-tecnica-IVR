/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.konecta.nomina.servicio;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Vanessa
 */
public class ServicioFestivos {
    private final List<LocalDate> festivosColombia2024;
    
    public ServicioFestivos() {
        festivosColombia2024 = inicializarFestivos2024();
    }
    
    private List<LocalDate> inicializarFestivos2024() {
        List<LocalDate> festivos = new ArrayList<>();
        
        // Festivos fijos 2024
        festivos.add(LocalDate.of(2024, 1, 1));   
        festivos.add(LocalDate.of(2024, 5, 1));   
        festivos.add(LocalDate.of(2024, 7, 20));  
        festivos.add(LocalDate.of(2024, 8, 7));   
        festivos.add(LocalDate.of(2024, 12, 25)); 
        
        // Festivos trasladables 2024
        festivos.add(LocalDate.of(2024, 3, 28));  
        festivos.add(LocalDate.of(2024, 3, 29));  
        festivos.add(LocalDate.of(2024, 1, 8));   
        festivos.add(LocalDate.of(2024, 3, 25));  
        festivos.add(LocalDate.of(2024, 5, 13));  
        festivos.add(LocalDate.of(2024, 6, 3));   
        festivos.add(LocalDate.of(2024, 6, 10));  
        festivos.add(LocalDate.of(2024, 7, 1));   
        festivos.add(LocalDate.of(2024, 8, 19));  
        festivos.add(LocalDate.of(2024, 10, 14)); 
        festivos.add(LocalDate.of(2024, 11, 4));  
        festivos.add(LocalDate.of(2024, 11, 11)); 
        
        return festivos;
    }
    
    public boolean esFestivo(LocalDate fecha) {
        return festivosColombia2024.contains(fecha);
    }
    
}
    

