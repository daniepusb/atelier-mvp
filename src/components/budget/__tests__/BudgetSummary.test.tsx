import { render, screen, fireEvent } from "@testing-library/react";
import { vi, it, describe, beforeEach, expect } from "vitest";
import { BudgetSummary } from "../BudgetSummary";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(() => Promise.resolve()),
  serverTimestamp: vi.fn(() => "mocked_timestamp"),
  getFirestore: vi.fn(() => ({ firestore: "mockedFirestore" })),
}));


vi.mock("jspdf", () => {
  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      setFontSize: vi.fn(),
      text: vi.fn(),
      save: vi.fn(),
    })),
  };
});


describe("BudgetSummary", () => {
  const mockClient = { id: "c1", name: "Ana" };
  const mockItem = { id: "i1", name: "Vestido Rojo", price: 50 };
  const mockTasks = [
    { id: "t1", name: "Entallar", price: 20 },
    { id: "t2", name: "Acortar", price: 15 },
  ];
  const brandId = "M1";
  const userId = "user123";

  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });


  it("llama a saveQuote al hacer click en 'Guardar'", async () => {
    const { getByText } = render(
      <BudgetSummary
        client={mockClient}
        item={mockItem}
        tasks={mockTasks}
        brandId={brandId}
        userId={userId}
      />
    );

    const guardarBtn = getByText("Guardar");
    await fireEvent.click(guardarBtn);

    expect(window.alert).toHaveBeenCalledWith("Presupuesto guardado ✅");
  });

  it("genera y descarga un PDF al hacer click en 'Descargar PDF'", () => {
    const { getByText } = render(
      <BudgetSummary
        client={mockClient}
        item={mockItem}
        tasks={mockTasks}
        brandId={brandId}
        userId={userId}
      />
    );

    const descargarBtn = getByText("Descargar PDF");
    fireEvent.click(descargarBtn);

    expect(getByText("Descargar PDF")).toBeInTheDocument();
  });

  it("renderiza el resumen correctamente", () => {
    render(
      <BudgetSummary
        client={mockClient}
        item={mockItem}
        tasks={mockTasks}
        brandId={brandId}
        userId={userId}
      />
    );

    expect(screen.getByRole('contentClientNameInfo')).toHaveTextContent("Cliente: Ana");
    expect(screen.getByRole('contentDressNameInfo')).toHaveTextContent("Vestido: Vestido Rojo (€50)");
    expect(screen.getByText("Entallar (€20)")).toBeInTheDocument();
    expect(screen.getByText("Acortar (€15)")).toBeInTheDocument();
    expect(screen.getByRole('contentTotalInfo')).toHaveTextContent("Total: €85");
  });
});
