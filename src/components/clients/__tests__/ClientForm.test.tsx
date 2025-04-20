import { render, screen, fireEvent } from "@testing-library/react";
import { ClientForm } from "../ClientForm";
import { describe, expect, it, vi } from "vitest";

vi.mock("firebase/firestore", async () => {
  return {
    collection: vi.fn(),
    addDoc: vi.fn().mockResolvedValue({ id: "mockId" }),
    Timestamp: { now: () => "mock-timestamp" },
  };
});

vi.mock("firebase/storage", async () => {
  return {
    ref: vi.fn().mockReturnValue("mockRef"),
    uploadBytes: vi.fn().mockResolvedValue("uploaded"),
    getDownloadURL: vi.fn().mockResolvedValue("https://mock-url.com/photo.png"),
  };
});

vi.mock("../../../firebaseConfig", async () => {
  const firestore = await import("firebase/firestore");
  const storage = await import("firebase/storage");
  return {
    db: {},
    storage: {},
    ...firestore,
    ...storage,
  };
});

describe("ClientForm", () => {
  it("renderiza el formulario correctamente", () => {
    render(<ClientForm brandId="M1" userId="user1" />);
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email (opcional)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("busto")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("cintura")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("pecho")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("cuello")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("brazos")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("piernas")).toBeInTheDocument();
  });

  it("permite escribir en los campos", () => {
    render(<ClientForm brandId="M1" userId="user1" />);
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email (opcional)"), {
      target: { value: "juan@example.com" },
    });

    expect(screen.getByPlaceholderText("Nombre")).toHaveValue("Juan Pérez");
    expect(screen.getByPlaceholderText("Email (opcional)")).toHaveValue("juan@example.com");
  });

  it("envía el formulario correctamente", async () => {
    render(<ClientForm brandId="M1" userId="user1" />);
    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email (opcional)"), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("busto"), {
      target: { value: "90" },
    });
    fireEvent.change(screen.getByPlaceholderText("cintura"), {
      target: { value: "70" },
    });

    const file = new File(["dummy"], "test.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText(/Cargar imagen/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText("Guardar Cliente"));

    const success = await screen.findByText(/Cliente creado correctamente/i);
    expect(success).toBeInTheDocument();
  });

  it("muestra un mensaje de error si el nombre no se ingresa", async () => {
    render(<ClientForm brandId="M1" userId="user1" />);
    fireEvent.change(screen.getByPlaceholderText("Email (opcional)"), {
      target: { value: "juan@example.com" },
    });

    fireEvent.click(screen.getByText("Guardar Cliente"));

    const error = await screen.findByText("Falta nombre");
    expect(error).toBeInTheDocument();
  });
});
