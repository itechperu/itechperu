'use client';

import React from 'react';
import { Table, withTableActions, Label } from '@gravity-ui/uikit';

const MyTable = withTableActions(Table);

export const AdminProductTable = ({ products }: { products: any[] }) => {

    const columns = [
        { id: 'name', name: 'Producto' },
        { id: 'price', name: 'Precio', template: (item: any) => `S/ ${item.originalPrice}` },
        { id: 'condition', name: 'Condición', template: (item: any) => <Label>{item.condition}</Label> },
        { id: 'category', name: 'Categoría', template: (item: any) => <Label>{item.category}</Label> },
        { id: 'status', name: 'Estado', template: (item: any) => <Label theme={item.status === 'AVAILABLE' ? 'success' : 'danger'}>{item.status}</Label> },
    ];

    return (
        <MyTable
            data={products}
            columns={columns}
            getRowActions={() => [
                { text: 'Editar', handler: () => alert('Editar - Pendiente') },
                { text: 'Eliminar', handler: () => alert('Eliminar - Pendiente'), theme: 'danger' }
            ]}
        />
    );
};
