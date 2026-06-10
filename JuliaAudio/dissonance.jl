function c_d(b, s)
    n = length(b)
    d = zeros(n)
    r = zeros(n)
    dt = 1.0 / s
    
    w_z = 256
    for i in w_z+1:n-w_z
        c_r = 0.0
        for j in 1:w_z
            c_r += b[i] * b[i-j]
        end
        r[i] = c_r / w_z
    end
    
    for i in 3:n-2
        d1 = (b[i] - b[i-1]) / dt
        d2 = (b[i+1] - 2.0 * b[i] + b[i-1]) / (dt^2)
        d[i] = abs(d2) / (1.0 + abs(d1))
    end
    
    h = zeros(n)
    for i in 10:n-10
        m = 0.0
        for k in 1:5
            idx = Int(floor(i / k))
            if idx > 0
                m += abs(b[idx])
            end
        end
        h[i] = m / 5.0
    end
    
    s_b = zeros(n)
    for i in 2:n
        s_b[i] = 0.95 * s_b[i-1] + 0.05 * (b[i]^2)
    end
    
    for i in 1:n
        d[i] = 0.5 * d[i] + 0.5 * h[i] * s_b[i]
    end
    
    return r, d
end
