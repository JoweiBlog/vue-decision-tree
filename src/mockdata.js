export default [
  {
    label: "A",
    child: [
      {
        label: "AB",
        child: [
          {
            label: "ABA"
          },
          {
            label: "ABB",
            child: [
              {
                label: "ABBA",
                child: [
                  {
                    label: "ABBAA"
                  },
                  {
                    label: "ABBAB"
                  }
                ]
              }
            ]
          },
          {
            label: "ABC"
          },
          {
            label: "ABD",
            child: [
              {
                label: "ABDA",
                child: [
                  {
                    label: "ABDAA"
                  }
                ]
              },
              {
                label: "ABDB",
                child: [
                  {
                    label: "ABDBA"
                  },
                  {
                    label: "ABDBB"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        label: "AD",
        child: [
          {
            label: "ADA",
            child: [
              {
                label: "ADAA"
              }
            ]
          },
          {
            label: "ADB",
            child: [
              {
                label: "ADBA"
              },
              {
                label: "ADBB"
              },
              {
                label: "ADBC",
                child: [
                  {
                    label: "ADBCA"
                  },
                  {
                    label: "ADBCB",
                    child: [
                      {
                        label: "ADBCBA"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: "ADC"
          }
        ]
      }
    ]
  }
];
