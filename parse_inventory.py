
import re
import json

def parse_inventory(filename):
    products = []
    current_category = None
    
    # Default image for demo
    default_image = "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop"
    
    category_map = {
        'ANKLE SUPPORT': 'accessories',
        'BADMINTON ROCKETS': 'badminton',
        'BAGS': 'bags',
        'BALL BADMINTON': 'badminton',
        'BADMINTON STRINGS': 'badminton',
        'GRIPS': 'accessories',
        'SHOES': 'shoes',
        'SHORTS': 'apparel',
        'SHUTTLE COCK': 'badminton',
        'T SHIRTS': 'apparel',
        'TENNIS BALLS': 'tennis',
        'TENNIS ROCKETS': 'tennis',
        'TENNIS STRINGS': 'tennis',
        'WRAP': 'accessories',
        'WRIST BAND': 'accessories',
        'YONEX ROCKET': 'badminton'
    }

    price_map = {
        'accessories': 499,
        'badminton': 4999,
        'bags': 2999,
        'shoes': 7999,
        'apparel': 1499,
        'tennis': 8999,
    }
    
    # Existing curated products to keep at the top
    existing_products = [
      {
        "id": 1,
        "name": "HEAD Radical Nite 2024 Pickleball Paddle",
        "price": 17919,
        "originalPrice": 27999,
        "discount": 36,
        "category": "pickleball",
        "image": "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
        "brand": "Head"
      },
      {
        "id": 2,
        "name": "ASICS Gel Resolution 9 Tennis Shoes - White/Black",
        "price": 11999,
        "originalPrice": 14999,
        "discount": 20,
        "category": "shoes",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop",
        "brand": "Asics"
      },
      {
        "id": 3,
        "name": "Babolat Pure Aero 2023 Tennis Racquet",
        "price": 18499,
        "originalPrice": 22999,
        "discount": 20,
        "category": "tennis",
        "image": "https://images.unsplash.com/photo-1613936360976-8f35dd0e5407?q=80&w=1975&auto=format&fit=crop",
        "brand": "Babolat"
      },
      {
        "id": 4,
        "name": "Wilson Pro Staff 97 v14 Tennis Racquet",
        "price": 21999,
        "originalPrice": 26999,
        "discount": 18,
        "category": "tennis",
        "image": "https://images.unsplash.com/photo-1530915536736-a617a94e2800?q=80&w=2070&auto=format&fit=crop",
        "brand": "Wilson"
      },
      {
        "id": 5,
        "name": "Yonex Astrox 99 Pro Badminton Racquet",
        "price": 15999,
        "originalPrice": 18999,
        "discount": 15,
        "category": "badminton",
        "image": "https://images.unsplash.com/photo-1626224583764-847649623db6?q=80&w=2560&auto=format&fit=crop",
        "brand": "Yonex"
      },
      {
        "id": 6,
        "name": "Head Graphene 360+ Speed 120 Squash Racquet",
        "price": 8999,
        "originalPrice": 11999,
        "discount": 25,
        "category": "squash",
        "image": "https://images.unsplash.com/photo-1508196261864-8078988b7c87?q=80&w=2000&auto=format&fit=crop",
        "brand": "Head"
      },
      {
        "id": 7,
        "name": "Franklin X-40 Pickleball Balls (3 Pack)",
        "price": 1299,
        "originalPrice": 1599,
        "discount": 18,
        "category": "pickleball",
        "image": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop",
        "brand": "Franklin"
      },
      {
        "id": 8,
        "name": "Babolat RPM Blast Tennis String Reel",
        "price": 14999,
        "originalPrice": 18999,
        "discount": 21,
        "category": "tennis",
        "image": "https://images.unsplash.com/photo-1563207766-8b86f5d72d72?q=80&w=2000&auto=format&fit=crop",
        "brand": "Babolat"
      }
    ]
    
    products.extend(existing_products)
    
    with open(filename, 'r') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if '|' not in line:
            if "TOTAL" in line:
                continue
            current_category = line
            continue
            
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 2:
            name = parts[0]
            mapped_cat = category_map.get(current_category, 'accessories')
            base_price = price_map.get(mapped_cat, 1000)
            variation = (len(name) * 123) % 2000
            price = base_price + variation
            
            brand = "Generic"
            name_upper = name.upper()
            if "YONEX" in name_upper: brand = "Yonex"
            elif "LI-NING" in name_upper or "LINING" in name_upper: brand = "Li-Ning"
            elif "HEAD" in name_upper: brand = "Head"
            elif "WILSON" in name_upper: brand = "Wilson"
            elif "BABOLAT" in name_upper: brand = "Babolat"
            elif "VICTOR" in name_upper: brand = "Victor"
            elif "ASICS" in name_upper: brand = "Asics"
            elif "HUNDRED" in name_upper: brand = "Hundred"
            elif "APACS" in name_upper: brand = "Apacs"
            elif "KONEX" in name_upper: brand = "Konex"
            elif "KLINT" in name_upper: brand = "Klint"
            
            product = {
                "id": len(products) + 1,
                "name": name,
                "price": price,
                "originalPrice": int(price * 1.2),
                "discount": 20,
                "category": mapped_cat,
                "image": default_image,
                "brand": brand
            }
            products.append(product)
            
    js_content = f"export const products = {json.dumps(products, indent=2)};"
    
    with open('src/data/products.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Generated products.js with {len(products)} items")

if __name__ == "__main__":
    parse_inventory("inventory.txt")
