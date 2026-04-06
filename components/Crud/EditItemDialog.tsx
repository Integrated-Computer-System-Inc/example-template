'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import { Item } from '@/interface/item';

const { TextArea } = Input;

interface EditItemDialogProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values: Partial<Item>) => void;
    item: Item | null;
    isEditing: boolean;
    confirmLoading?: boolean;
}

const categoryOptions = [
    { label: 'General', value: 'General' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Operations', value: 'Operations' },
];

export default function EditItemDialog({ visible, onCancel, onSave, item, isEditing, confirmLoading }: EditItemDialogProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (isEditing && item) {
                form.setFieldsValue({ ...item });
            } else {
                form.resetFields();
            }
        }
    }, [visible, item, isEditing, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            onSave({ ...item, ...values });
        });
    };

    return (
        <Modal
            title={isEditing ? "Edit Item" : "Add New Item"}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            okText={isEditing ? "Update" : "Create"}
            destroyOnHidden
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
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    status: true,
                    category: null,
                }}
            >
                <div className="mb-5">
                    <h3 className="text-sm font-bold text-text uppercase tracking-wider mb-1">Item Information</h3>
                    <p className="text-xs text-text-info">Enter the item details below.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the item name' }]}
                    >
                        <Input placeholder="e.g. Sample Item" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select placeholder="Select a category" options={categoryOptions} allowClear />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <TextArea rows={3} placeholder="e.g. A brief description of the item" />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
