import java.util.Scanner;
import java.util.ArrayList;

public class main {
    private static ArrayList<Cliente> clientes = new ArrayList<>();
    private static ArrayList<Canino> caninos = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    private static final String USUARIO_CORRECTO = "147852369";
    private static final String CONTRASENA_CORRECTA = "1234";

    public static void main(String[] args) {
        ejecutarLogin();
        mostrarMenuPrincipal();
    }

    private static void ejecutarLogin() {
        System.out.println("Bienvenido al sistema de gestión de clientes y caninos");
        int intentos = 3;
        while (intentos > 0) {
            System.out.print("Ingrese su id de Usuario: ");
            String usuario = scanner.nextLine();
            System.out.print("Ingrese su contraseña: ");
            String contrasena = scanner.nextLine();

            if (usuario.equals(USUARIO_CORRECTO) && contrasena.equals(CONTRASENA_CORRECTA)) {
                System.out.println("Login exitoso. ¡Bienvenido!");
                return;
            } else {
                intentos--;
                System.out.println("Usuario o contraseña incorrectos. Intentos restantes: " + intentos);
            }
        }
        System.out.println("Demasiados intentos fallidos. El programa se cerrará.");
        System.exit(0);
    }

    private static void mostrarMenuPrincipal() {
        int opcion = 0;
        do {
            System.out.println("\nMenú Principal:");
            System.out.println("1. Registrar Cliente");
            System.out.println("2. Registrar Canino");
            System.out.println("3. Consultas");
            System.out.println("4. Salir");
            System.out.print("Seleccione una opción: ");
            opcion = scanner.nextInt();
            scanner.nextLine(); //buffer

            switch (opcion) {
                case 1:
                    registrarCliente();
                    break;
                case 2:
                    registrarCanino();
                    break;
                case 3:
                    moduloConsultas();
                    break;
                case 4:
                    System.out.println("Saliendo del programa. ¡Hasta luego!");
                    break;
                default:
                    System.out.println("Opción no válida. Por favor, intente de nuevo.");
            }
        } while (opcion != 4);
    }

    private static void registrarCliente() {
        System.out.print("Ingrese el ID del cliente: ");
        String idCliente = scanner.nextLine();
        if (existeCliente(idCliente)) {
            System.out.println("El ID del cliente ya existe. No se puede registrar.");
            return;
        }
        System.out.print("Ingrese el nombre del cliente: ");
        String nombre = scanner.nextLine();
        System.out.print("Ingrese el teléfono del cliente: ");
        String telefono = scanner.nextLine();
        System.out.print("Ingrese el correo del cliente: ");
        String correo = scanner.nextLine();
        System.out.print("Ingrese la dirección del cliente: ");
        String direccion = scanner.nextLine();

        Cliente nuevoCliente = new Cliente(idCliente, nombre, telefono, correo, direccion);
        clientes.add(nuevoCliente);
        System.out.println("Cliente registrado exitosamente.");
    } 

    
    private static boolean existeCliente(String idCliente) {
        for (Cliente cliente : clientes) {
            if (cliente.getIdCliente().equals(idCliente)) {
                return true;
            }
        }
        return false;
    }

    private static void registrarCanino() {
        System.out.println("\nConfirmar que el cliente esté registrado");
        System.out.print("Ingrese el ID del cliente: ");
        String idCliente = scanner.nextLine();

        if (!existeCliente(idCliente)) {
            System.out.println("Cliente no encontrado. No se puede registrar el canino.");
            return;
        }

        System.out.print("Ingrese el ID del canino: ");
        String idCanino = scanner.nextLine();
        System.out.print("Ingrese el nombre del canino: ");
        String nombre = scanner.nextLine();
        System.out.print("Ingrese la raza del canino: ");
        String raza = scanner.nextLine();
        System.out.print("Ingrese la edad del canino: ");
        int edad = scanner.nextInt();
        scanner.nextLine(); //buffer

        Canino nuevoCanino = new Canino(idCanino, nombre, raza, edad, idCliente);
        caninos.add(nuevoCanino);
        System.out.println("Canino registrado exitosamente.");
    }

    private static void moduloConsultas() {
        System.out.println("\nMódulo de Consultas:");
        System.out.println("1. Listar Clientes");
        System.out.println("2. Listar Caninos por Cliente");
        System.out.println("3. Volver al Menú Principal");
        System.out.print("Seleccione una opción: ");
        int opcion = scanner.nextInt();
        scanner.nextLine(); // buffer

        if (opcion == 1) {
       
            if (clientes.isEmpty()) {
                System.out.println("No hay clientes registrados.");
            } else {
                System.out.println("\nClientes registrados:");
                for (Cliente cliente : clientes) {
                    System.out.println("- ID: " + cliente.getIdCliente()
                            + " | Nombre: " + cliente.getNombre()
                            + " | Teléfono: " + cliente.getTelefono()
                            + " | Correo: " + cliente.getCorreo()
                            + " | Dirección: " + cliente.getDireccion());
                }
            }
        } else if (opcion == 2) {
            
            System.out.print("Ingrese el ID del cliente: ");
            String idBusqueda = scanner.nextLine();
            boolean encontrado = false;

            System.out.println("Mascotas asociadas al cliente: ");
            for (Canino canino : caninos) {
                if (canino.getIdCliente().equals(idBusqueda)) {
                    System.out.println("- " + canino.getNombre()
                            + " (Raza: " + canino.getRaza()
                            + ", Edad: " + canino.getEdad() + " años)");
                    encontrado = true;
                }
            }
            if (!encontrado) {
                System.out.println("No se encontraron caninos asociados a ese cliente.");
            }
        } else if (opcion == 3) {
            System.out.println("Volviendo al Menú Principal...");
        } else {
            System.out.println("Opción no válida.");
        }
    }
}