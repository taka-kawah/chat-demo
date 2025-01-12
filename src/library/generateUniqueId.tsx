export default function generateUniqueId(): string{
    const timestamp = Date.now().toString(36); // 36進数に変換（アルファベットと数字）
    const randomPart = Math.random().toString(36).substring(2, 10); // ランダム部分  
    return (timestamp + randomPart).substring(0, 16);
}