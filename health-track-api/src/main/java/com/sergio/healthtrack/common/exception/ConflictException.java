package com.sergio.healthtrack.common.exception;


/*
  Para cuando algo no existe
*/

public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }

}
