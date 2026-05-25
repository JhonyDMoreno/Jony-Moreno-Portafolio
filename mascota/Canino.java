public class Canino {
    private String idCanino;
    private String nombre;
    private String raza;
    private int edad;
    private String idCliente;

    public Canino(String idCanino, String nombre, String raza, int edad, String idCliente) {
        this.idCanino = idCanino;
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.idCliente = idCliente;
    }

    public String getIdCanino() {
        return idCanino;
    }

    public String getNombre() {
        return nombre;
    }

    public String getRaza() {
        return raza;
    }

    public int getEdad() {
        return edad;
    }

    public String getIdCliente() {
        return idCliente;
    }
}