'use client';

import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import StatusChip from '@/components/Table/StatusChip';
import { Item } from '@/interface/item';

interface ViewItemDialogProps {
    visible: boolean;
    onClose: () => void;
    item: Item | null;
}

export default function ViewItemDialog({ visible, onClose, item }: ViewItemDialogProps) {
    if (!item) return null;

    return (
        <Modal
            title="Item Details"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
            styles={{ body: { paddingTop: '20px' } }}
        >
            <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-primary">{item.name.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="text-xl font-bold text-text">{item.name}</h2>
                <span className="text-sm text-text-info">{item.category}</span>
            </div>

            <Descriptions column={1} bordered size="small" styles={{ label: { width: '40%' } }}>
                <Descriptions.Item label="ID">
                    <span className="font-medium text-text">{item.id}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                    <span className="font-medium text-text-info">{item.name}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    <span className="font-medium text-text-info">{item.description || 'N/A'}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                    <Tag color="blue" className="rounded-full px-3">{item.category}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    <span className="font-medium text-text-info">{item.createdAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <StatusChip status={item.status} />
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
}
