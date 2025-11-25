// seed.ts

// 1. Custom Import Path
import { 
  PrismaClient, 
  TransactionType, 
  TransactionCategory, 
  GoalType,
  RentStatus 
} from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// --- ADAPTER SETUP ---
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// --- MOCK DATA ---

// 1. The Human (Identity)
const MOCK_USER_IDENTITY = {
    firstName: "Somtochukwu",
    lastName: "Ike-Adinnu",
    middleName: "Bryan",
    email: "bryansomto@gmail.com",
    password: "$2b$10$rpTKG/KnJdmyjjzGxQv6UuojO8hxIDydzA8GvPSQKO9NUDsOfDHxa",
    image: null,
};

// 2. The Tenant Role Data (Specific to renting)
const MOCK_TENANT_DETAILS = {
    currentRent: 1500000, 
    rentStatus: RentStatus.ACTIVE, // Using the new Enum
    pensionProvider: "Leadway Pensure",
    pensionStatus: "Active - 26 Remittances Found",
};

// 3. A Dummy Landlord (To demonstrate the relationship)
const MOCK_LANDLORD_IDENTITY = {
    firstName: "Chief",
    lastName: "Obi",
    email: "chief.obi@realestate.ng",
};

const MOCK_PROPERTY = {
    name: "Lekki Gardens Phase 2",
    address: "Unit 4, Block C, Lekki Gardens, Lagos",
    description: "3 Bedroom Apartment",
};

// 4. Financial Data (Unchanged)
const MOCK_ACCOUNTS = [
    {
        bank: "FlexRent Pre-Approved",
        shortName: "Credit Limit",
        accountNumber: "FLEX-ID-001",
        balance: 4000000,
        isCreditLine: true,
        colorScheme: "blue",
    },
    {
        bank: "Guaranty Trust Bank",
        shortName: "GTBank",
        accountNumber: "2074606070",
        balance: 850400,
        isSalaryAccount: true,
        colorScheme: "orange",
    },
    {
        bank: "Cowrywise (Savings)",
        shortName: "Cowrywise",
        accountNumber: "5677567019",
        balance: 450000,
        isSalaryAccount: false,
        colorScheme: "green",
    },
];

const MOCK_TRANSACTIONS = [
    {
        date: "2025-11-25T09:00:00Z",
        name: "FlexRent Monthly Debit",
        description: "Rent for November (Month 3/12)",
        amount: -210000,
        type: "Expense",
        category: "Rent Payment",
        accountNumber: "2074606070",
    },
    {
        date: "2025-11-10T08:15:00Z",
        name: "Estate Service Charge",
        description: "Waste & Security Levy",
        amount: -45000,
        type: "Expense",
        category: "Service Charge",
        accountNumber: "5677567019",
    },
];

const MOCK_GOALS = [
    {
        title: "2026 Rent Renewal",
        icon: "RentRenewal",
        type: "Saving",
        currentAmount: 450000,
        targetAmount: 3000000,
        completed: false,
    },
    {
        title: "Furniture Upgrade",
        icon: "Furniture",
        type: "Saving",
        currentAmount: 600000,
        targetAmount: 600000,
        completed: true,
    },
];

// --- HELPERS ---
const mapTransactionType = (typeString: string): TransactionType => {
    return TransactionType[typeString.toUpperCase() as keyof typeof TransactionType];
};

const mapTransactionCategory = (categoryString: string): TransactionCategory => {
    const categoryKey = categoryString.toUpperCase().replace(/\s/g, '_');
    return TransactionCategory[categoryKey as keyof typeof TransactionCategory];
};

const mapGoalType = (typeString: string): GoalType => {
    return GoalType[typeString.toUpperCase() as keyof typeof GoalType];
};

// --- SEED FUNCTION ---
async function main() {
    console.log(`Start seeding ...`);

    // -------------------------------------------
    // 1. CREATE USERS & PROFILES
    // -------------------------------------------

    // A. Create Main User (Somtochukwu)
    const user = await prisma.user.upsert({
        where: { email: MOCK_USER_IDENTITY.email },
        update: {},
        create: MOCK_USER_IDENTITY,
    });
    console.log(`Checked user: ${user.firstName} ${user.lastName}`);

    // B. Create/Update Tenant Profile for Somtochukwu
    // We use upsert so we don't crash if he already exists
    const tenantProfile = await prisma.tenantProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
            userId: user.id,
            ...MOCK_TENANT_DETAILS,
            currentRent: MOCK_TENANT_DETAILS.currentRent.toString(),
        }
    });
    console.log(`Linked Tenant Profile to: ${user.firstName}`);

    // C. Create Landlord (Chief Obi)
    const landlordUser = await prisma.user.upsert({
        where: { email: MOCK_LANDLORD_IDENTITY.email },
        update: {},
        create: {
            ...MOCK_LANDLORD_IDENTITY,
            middleName: null,
            image: null,
        }
    });

    // D. Create Landlord Profile for Chief Obi
    const landlordProfile = await prisma.landlordProfile.upsert({
        where: { userId: landlordUser.id },
        update: {},
        create: {
            userId: landlordUser.id,
            verificationId: "NIN-123456789",
        }
    });
    console.log(`Created Landlord: ${landlordUser.firstName}`);

    // -------------------------------------------
    // 2. PROPERTIES & LEASES (The Relationship)
    // -------------------------------------------

    // A. Create a Property for the Landlord
    const property = await prisma.property.create({
        data: {
            landlordId: landlordProfile.id,
            ...MOCK_PROPERTY
        }
    });
    console.log(`Created Property: ${property.name}`);

    // B. Create a Lease linking Somtochukwu (Tenant) to the Property
    // Check if lease exists first to avoid duplicates in seed
    const existingLease = await prisma.lease.findFirst({
        where: { tenantId: tenantProfile.id, propertyId: property.id }
    });

    if (!existingLease) {
        await prisma.lease.create({
            data: {
                tenantId: tenantProfile.id,
                propertyId: property.id,
                startDate: new Date("2024-01-01"),
                endDate: new Date("2025-01-01"),
                monthlyRent: 125000, // 1.5m / 12
                isActive: true
            }
        });
        console.log(`Created Lease for ${user.firstName} at ${property.name}`);
    }

    // -------------------------------------------
    // 3. FINANCIALS (Cleanup & Re-create)
    // -------------------------------------------
    
    await prisma.transaction.deleteMany({ where: { userId: user.id } });
    await prisma.goal.deleteMany({ where: { userId: user.id } });
    console.log(`Cleaned up old transactions and goals.`);

    // Upsert Accounts
    const accountMap: Record<string, string> = {};
    for (const acc of MOCK_ACCOUNTS) {
        const account = await prisma.account.upsert({
            where: { accountNumber: acc.accountNumber },
            update: { balance: acc.balance.toString() },
            create: {
                ...acc,
                userId: user.id,
                balance: acc.balance.toString(),
            },
        });
        accountMap[account.accountNumber] = account.id;
    }

    // Create Transactions
    for (const t of MOCK_TRANSACTIONS) {
        const accountId = accountMap[t.accountNumber];
        if (accountId) {
            await prisma.transaction.create({
                data: {
                    userId: user.id,
                    accountId: accountId,
                    date: new Date(t.date),
                    name: t.name,
                    description: t.description,
                    amount: t.amount.toString(),
                    type: mapTransactionType(t.type),
                    category: mapTransactionCategory(t.category),
                },
            });
        }
    }
    console.log(`Created ${MOCK_TRANSACTIONS.length} transactions.`);

    // Create Goals
    for (const g of MOCK_GOALS) {
        await prisma.goal.create({
            data: {
                userId: user.id,
                title: g.title,
                icon: g.icon,
                type: mapGoalType(g.type),
                completed: g.completed,
                currentAmount: g.currentAmount.toString(),
                targetAmount: g.targetAmount.toString(),
            },
        });
    }
    console.log(`Created ${MOCK_GOALS.length} goals.`);
    console.log(`Seeding finished successfully.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });