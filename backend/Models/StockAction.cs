namespace Finlytics_Csharp.Models
{
    public class StockAction
    {
        public int Id { get; set; }
        public string Ticker { get; set; } // e.g., PETR4
        public string CompanyName { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Currency { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal CurrentPrice { get; set; }
        public decimal PurchaseFee { get; set; }
        public int Quantity { get; set; }
        public string ProbabilityArrow { get; set; } // e.g., "Up", "Down"
        public decimal Upside { get; set; } // %
        public decimal Downside { get; set; } // %
        public int Quality { get; set; } // 0–100 or rating system
    }
}
