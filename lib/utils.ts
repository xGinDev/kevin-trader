import { createCn } from "cn/config"

// Las utilidades tipográficas de globals.css (text-label, text-body-sm…) son tamaños de
// fuente, no colores: sin esto, cn las descartaría al combinarlas con text-foreground.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h2", "h3", "body-lg", "body", "body-sm", "label", "label-sm", "stat", "data"] },
      ],
    },
  },
})
