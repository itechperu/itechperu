'use client';

import React from 'react';
import { Card, Button, Text, TextInput, Select, Container, Table, Label } from '@gravity-ui/uikit';
import { createProductAction, getProducts } from '@/lib/actions/product-actions';

// Define the Product interface based on what getProducts returns
interface Product {
    id: string;
    name: string;
    originalPrice: number;
    condition: string;
    category: string;
    status: string;
}

export default function AdminPage() {
    // State for the form
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>([]);

    // Load products on mount
    React.useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        const data = await getProducts();
        // Cast or map data if needed, but for now assuming it matches
        setProducts(data as any);
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            // Direct FormData passing since server action was updated
            const result = await createProductAction(formData);

            if (result.success) {
                alert('Producto creado exitosamente');
                const form = document.getElementById('create-product-form') as HTMLFormElement;
                form.reset();
                await loadProducts();
            } else {
                alert('Error al crear producto: ' + JSON.stringify(result.error));
            }
        } catch (error) {
            console.error(error);
            alert('Error al crear producto');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container style={{ padding: '40px 20px' }}>
            <Text variant="display-1" className="mb-4">Panel de Administración</Text>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                {/* --- FORMULARIO DE CREACIÓN --- */}
                <div>
                    <Card style={{ padding: 24 }}>
                        <Text variant="header-2" className="mb-4">Nuevo Producto</Text>
                        <form id="create-product-form" action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <TextInput name="name" size="l" placeholder="Nombre del Producto" label="Nombre" hasClear />
                            <TextInput name="description" size="l" placeholder="Descripción" label="Descripción" hasClear />

                            <div style={{ display: 'flex', gap: 16 }}>
                                <TextInput name="originalPrice" type="number" size="l" placeholder="0.00" label="Precio" hasClear />
                                <TextInput name="discountPrice" type="number" size="l" placeholder="0.00" label="Oferta (Opcional)" hasClear />
                            </div>

                            {/* Using native Select for simplicity with FormData or Gravity Select controlled? 
                                User asked for Gravity Select. Gravity Select doesn't work easily with native FormData without hidden input.
                                I will use a workaround: Gravity Select updating a hidden input.
                            */}

                            {/* Workaround for Gravity Select + FormData: Using native select styled or just TextInput as requested in previous prompt?
                                User Prompt: "Usa componentes de Gravity UI (Card, TextInput, Select, Button)"
                                To make Gravity Select work with FormData, we need state.
                            */}
                            <SelectWithHiddenInput name="condition" placeholder="Condición" options={[
                                { value: 'EXCELENTE', content: 'Excelente' },
                                { value: 'BUENO', content: 'Bueno' },
                                { value: 'REGULAR', content: 'Regular' }
                            ]} />

                            <SelectWithHiddenInput name="category" placeholder="Categoría" options={[
                                { value: 'LAPTOP', content: 'Laptop' },
                                { value: 'CELULAR', content: 'Celular' },
                                { value: 'RELOJ', content: 'Reloj' },
                                { value: 'IPAD', content: 'iPad' }
                            ]} />

                            <TextInput name="image" size="l" placeholder="https://..." label="URL Imagen" hasClear />

                            <Button view="action" size="l" type="submit" loading={loading}>
                                Guardar Producto
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* --- LISTA DE PRODUCTOS --- */}
                <div>
                    <Text variant="header-2" className="mb-4">Inventario ({products.length})</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {products.map(p => (
                            <Card key={p.id} style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Text variant="subheader-1">{p.name}</Text>
                                    <Text variant="body-1" color="secondary" style={{ display: 'block' }}>
                                        {p.category} • {p.condition}
                                    </Text>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Text variant="header-2">S/ {Number(p.originalPrice).toFixed(2)}</Text>
                                    <br />
                                    <Label theme={p.status === 'AVAILABLE' ? 'success' : 'danger'}>{p.status}</Label>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Helper component to make Gravity Select work with Server Actions/FormData
function SelectWithHiddenInput({ name, options, placeholder }: { name: string, options: any[], placeholder: string }) {
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <>
            <input type="hidden" name={name} value={value[0] || ''} />
            <Select
                placeholder={placeholder}
                options={options}
                value={value}
                onUpdate={(vals) => setValue(vals)}
                width="max"
                size="l"
            />
        </>
    );
}
