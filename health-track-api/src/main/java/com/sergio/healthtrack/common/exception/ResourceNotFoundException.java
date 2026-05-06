package com.sergio.healthtrack.common.exception;


/*
  lo busca pero no existe
*/
public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
