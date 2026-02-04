'use client';

import React from 'react';
import { Button, TextInput, Select, Dialog, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { createProduct } from '@/lib/actions/product';

export const CreateProductDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            await createProduct(formData);
            setOpen(false);
        } catch (e) {
            alert('Error creating product');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button view="action" onClick={() => setOpen(true)}>
                <Icon data={Plus} />
                Nuevo Producto
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <Dialog.Header caption="Nuevo Producto" />
                <Dialog.Body>
                    <form id="create-product-form" action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 400 }}>
                        <TextInput name="name" placeholder="Nombre del Producto" label="Nombre" hasClear />
                        <TextInput name="description" placeholder="Descripción breve" label="Descripción" hasClear />
                        <div style={{ display: 'flex', gap: 16 }}>
                            <TextInput name="originalPrice" type="number" placeholder="0.00" label="Precio Original" hasClear />
                            <TextInput name="discountPrice" type="number" placeholder="0.00" label="Precio Oferta (Opcional)" hasClear />
                        </div>

                        {/* Manual Select implementation via hidden inputs since Gravity Select is complex to bind to native FormData directly without controlled state */}
                        <div>
                            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Condición (Escribir: EXCELENTE / BUENO / REGULAR)</label>
                            <TextInput name="condition" placeholder="EXCELENTE" defaultValue="EXCELENTE" />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Categoría (Escribir: LAPTOP / IPAD / RELOJ / CELULAR)</label>
                            <TextInput name="category" placeholder="LAPTOP" defaultValue="LAPTOP" />
                        </div>

                        <TextInput name="image" placeholder="https://..." label="URL de Imagen" hasClear />

                    </form>
                </Dialog.Body>
                <Dialog.Footer
                    textButtonApply="Crear"
                    textButtonCancel="Cancelar"
                    onClickButtonCancel={() => setOpen(false)}
                    onClickButtonApply={() => {
                        // Trigger form submission manually since Gravity Dialog buttons are outside the form
                        (document.getElementById('create-product-form') as HTMLFormElement)?.requestSubmit();
                    }}
                    propsButtonApply={{ loading: loading, type: 'submit', form: 'create-product-form' }}
                />
            </Dialog>
        </>
    );
};
