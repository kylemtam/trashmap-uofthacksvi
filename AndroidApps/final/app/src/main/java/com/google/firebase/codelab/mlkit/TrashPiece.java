package com.google.firebase.codelab.mlkit;

public class TrashPiece {
    public String id;
    public double[] latlng;
    public boolean canRecycle;
    public String name;

    public TrashPiece() {
    }

    public TrashPiece(String id, double[] latlng, boolean canRecycle, String name) {
        this.id = id;
        this.latlng = latlng;
        this.canRecycle = canRecycle;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public double[] getLatlng() {
        return latlng;
    }

    public boolean getCanRecycle(){
        return canRecycle;
    }

    public String getName(){
        return name;
    }
}