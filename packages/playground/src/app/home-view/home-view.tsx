import { useEffect, useState } from 'react';
import {
  Card,
  Spacings,
  Text,
  Stamp,
  CollapsiblePanel,
  Grid,
  SelectField,
  FlatButton
} from '@commercetools-frontend/ui-kit';
import { designTokens } from '@commercetools-uikit/design-system';
import { TabHeader } from '@commercetools-frontend/application-components';

import { TOrder } from '../../types';
import { loadOrder } from '../../api/orders';

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

  useEffect(() => {
    const fetchOrder = async () => {
      const orderData = await loadOrder();
      setOrder(orderData);
    }
    fetchOrder();
  }, []);

  if (!order) {
    return null;
  }

  const taxCost = (order.productsCost + order.shippingCosts) * (order.taxRate / 100);

  return (
    <Spacings.InsetSquish scale="l">
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1">Order: {order.id}</Text.Headline>
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
          gridGap={designTokens.spacing70}
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
                  options={[]}
                />
                <SelectField
                  title="Order status"
                  options={[]}
                />
                <SelectField
                  title="Payment status"
                  options={[]}
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
