import { useEffect, useState } from 'react';
import {
  Card,
  CollapsiblePanel,
  FlatButton,
  Grid,
  SelectField,
  SelectInput,
  Spacings,
  Stamp,
  TabHeader,
  Text,
} from '../../components';

import { TOrder, TOrderOptions } from '../../../types';
import { getOrderOptions, loadOrder } from '../../../api/orders';
import { currentTheme } from '../../stores/theme.store';

function SubtotalRow({ title, value }: { title: string; value: number; }) {
  return (
    <Spacings.Inline justifyContent="space-between">
      <Text.Detail isBold>{title}</Text.Detail>
      <Text.Detail isBold>{value.toFixed(2)}€</Text.Detail>
    </Spacings.Inline>
  );
}

function HomeView() {
  const [order, setOrder] = useState<TOrder>();
  const [orderOptions, setOrderOptions] = useState<TOrderOptions>();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderData = await loadOrder();
      const orderOptionsData = await getOrderOptions();
      setOrder(orderData);
      setOrderOptions(orderOptionsData);
    }
    fetchOrder();
  }, []);

  if (!order || !orderOptions) {
    return null;
  }

  const taxCost = (order.productsCost + order.shippingCosts) * (order.taxRate / 100);

  return (
    <Spacings.InsetSquish scale="l">
      <Spacings.Stack scale="xl">
        <Spacings.Inline justifyContent="space-between">
          <Text.Headline as="h1">Order: {order.id}</Text.Headline>
          <SelectInput
            horizontalConstraint={4}
            value={currentTheme.value}
            onChange={(event) => currentTheme.value = event.target.value as 'default' | 'dark'}
            options={[
              { value: 'default', label: 'Light theme' },
              { value: 'dark', label: 'Dark theme' },
            ]}
          />
        </Spacings.Inline>
        <Spacings.Stack scale="xs">
          <Spacings.Inline justifyContent="flex-end">
            <Spacings.Inline scale="s" alignItems="center">
              <Text.Headline as="h3">Order placed in store:</Text.Headline>
              <Stamp label={order.store} />
            </Spacings.Inline>
          </Spacings.Inline>
          <Spacings.Inline scale="xs">
            <TabHeader to="/" exactPathMatch label="General" />
            <TabHeader to="/custom-fields" label="Custom Fields" />
            <TabHeader to="/shipping-and-delivery" label="Shipping & Delivery" />
            <TabHeader to="/returns" label="Returns" />
            <TabHeader to="/payments" label="Payments" />
          </Spacings.Inline>
        </Spacings.Stack>
      </Spacings.Stack>

      <Spacings.InsetSquish scale="l">
        <Grid
          gridTemplateColumns="1fr 1fr"
          gridGap="64px"
        >
          <CollapsiblePanel
            header={<CollapsiblePanel.Header>Order summary</CollapsiblePanel.Header>}
          >
            <div style={{ width: '100%' }}>
              <Spacings.Stack scale="l">
                <SelectField
                  title="Order workflow status"
                  placeholder="Start a workflow"
                  horizontalConstraint="scale"
                  options={orderOptions.workflows}
                />
                <SelectField
                  title="Order status"
                  options={orderOptions.statuses}
                />
                <SelectField
                  title="Payment status"
                  options={orderOptions.paymentStatuses}
                />
              </Spacings.Stack>
            </div>
          </CollapsiblePanel>

          <Spacings.InsetSquish>
            <Spacings.Stack scale="xl">
              <Spacings.Stack scale="m">
                <Spacings.Stack scale="xs">
                  <Text.Detail tone="secondary" isBold>Date created: {order.createdDate}</Text.Detail>
                  <Text.Detail tone="secondary" isBold>Date modified: {order.modifiedDate}</Text.Detail>
                </Spacings.Stack>
                <FlatButton
                  label="Open change history"
                />
              </Spacings.Stack>

              <Card>
                <Spacings.Stack scale="l">
                  <Spacings.Stack scale="xs">
                    <SubtotalRow
                      title="Order original subtotal"
                      value={order.productsCost}
                    />
                    <SubtotalRow
                      title={`Tax rate (${order.taxRate}%)`}
                      value={taxCost}
                    />
                    <SubtotalRow
                      title="Shipping cost"
                      value={order.shippingCosts}
                    />
                  </Spacings.Stack>

                  <Spacings.Inline justifyContent="space-between">
                    <Text.Headline as="h3">Order final total</Text.Headline>
                    <Text.Headline as="h3">{(order.productsCost + order.shippingCosts + taxCost).toFixed(2)}€</Text.Headline>
                  </Spacings.Inline>
                </Spacings.Stack>
              </Card>
            </Spacings.Stack>
          </Spacings.InsetSquish>
        </Grid>
      </Spacings.InsetSquish>
    </Spacings.InsetSquish>
  );
}

export default HomeView;
