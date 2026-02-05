import React from 'react';
import { Table, Text, Label } from '@gravity-ui/uikit';
import { CreateProductDialog } from '@/app/components/admin/CreateProductDialog';
import { getProducts } from '@/lib/actions/product';

// Since Table is a client component in Gravity UI mostly, but we can pass data. 
// Ideally we keep this page server-side and render a ClientTable component.
// But for simplicity in this MVP, we will make this a Client Component wrapper or just pass data.
// Wait, Gravity UI Table is a React component. We need a client wrapper for the table.

import { AdminProductTable } from '@/app/components/admin/AdminProductTable';

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Text variant="header-1">Gestión de Productos</Text>
                <CreateProductDialog />
            </div>

            <AdminProductTable products={products} />
        </div>
    );
}
