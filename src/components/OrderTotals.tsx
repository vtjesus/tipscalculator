import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";
import { useMemo, Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";
type OrderTotalsProps = {
    order: OrderItem[]
    tip: number,
    dispatch: Dispatch<OrderActions>
}
export default function OrderTotals({ order, tip, dispatch } : OrderTotalsProps) {

    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price ), 0 ), [order])
    const tipAmount = useMemo(() => subtotalAmount * tip , [subtotalAmount, tip])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])
  return (
    <>
        <div className="space-y-3">
        <h2 className="font-black text-2xl">
        Итоги и Чаевые:
        </h2>
        <p>
        Промежуточный итог к оплате:
            <span className="font-bold"> {formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
            Чаевые:
            <span className="font-bold"> {formatCurrency(tipAmount)}</span>
        </p>
        <p>
        Итоговая сумма к оплате:
            <span className="font-bold"> {formatCurrency(totalAmount)}</span>
        </p>
        </div>
        <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-50" disabled={totalAmount == 0} onClick={() => dispatch({type: 'place-order'})}>
            Cделать заказ
        </button>
    </>
  )
}
