package com.zfy.bwcj.javaTutorial.thread.lock;

import java.util.concurrent.locks.ReentrantLock;

public class DeadlockExample2 {
    private static ReentrantLock lock1 = new ReentrantLock();
    private static ReentrantLock lock2 = new ReentrantLock();
    public static void main(String[] args) {
        new Thread(() -> {
            // 尝试获取锁1
            boolean result1 = lock1.tryLock();
            if (result1) {
                try {
                    // 成功获取锁1
                    System.out.println("Thread 1:  acquired lock1");
                    // mock some work
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println("Thread 1:  trying to acquire lock2");
                    // 尝试获取锁2
                    boolean result2 = lock2.tryLock();
                    if (result2) {
                        try {
                            // 成功获取 lock2 锁，输出提示信息
                            System.out.println("Thread 1:  get two locks");
                        } finally {
                            // 释放锁2
                            lock2.unlock();
                        }
                    } else {
                        System.out.println("Thread 1:  failed to acquire lock2");
                    }
                } finally {
                    lock1.unlock();
                    System.out.println("Thread 1:  releasing lock1");
                }
            } else {
                System.out.println("Thread 1:  failed to acquire lock1");
            }
        }).start();

        // 创建并启动线程2
        new Thread(() -> {
            // 尝试获取锁2
            boolean result2 = lock2.tryLock();
            if (result2) {
                try {
                    System.out.println("Thread 2: acquired lock2");
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println("Thread 2: trying to acquire lock1");

                    boolean result1 = lock1.tryLock();
                    if (result1) {
                        try {
                            System.out.println("Thread 2: get two locks");
                        } finally {
                            lock1.unlock();
                        }
                    } else {
                        System.out.println("Thread 2: failed to acquire lock1");
                    }
                } finally {
                    lock2.unlock();
                    System.out.println("Thread 2: releasing lock2");
                }
            } else {
                System.out.println("Thread 2: failed to acquire lock2");
            }
        }).start();
    }
}
